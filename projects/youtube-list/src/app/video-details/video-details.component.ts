import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { VideoRationModel } from 'projects/youtube-list/src/app/core/models/firebase-rating.model';
import { VideoListModel } from 'projects/youtube-list/src/app/core/models/video-item.model';
import { Observable, map, filter } from 'rxjs';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoDetailsComponent implements OnInit {
  @HostBinding('class.full-space-list') videoDetailsClass = true;

  videoDetailsResponse$: Observable<VideoListModel> = this.route.data.pipe(
    map((data) => data.videoDetails)
  );

  ratingStars = Array.from({ length: 4 }, (x, i) => i + 1);

  rating: VideoRationModel = {
    id: '',
    rating: 0,
  };

  private RatingCollection: AngularFirestoreCollection<VideoRationModel> =
    this.afs.collection<VideoRationModel>('videosRatings');

  allRatings$: Observable<VideoRationModel[]> =
    this.RatingCollection.valueChanges();

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.rating.id = this.route.snapshot.queryParams.id;
  }

  addRating(index: number) {
    this.rating.rating = index;
    this.RatingCollection.add(this.rating);
  }
}
