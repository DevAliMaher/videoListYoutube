import { VideoRationModel } from 'projects/youtube-list/src/app/core/models/firebase-rating.model';
import { VideoItemModel } from 'projects/youtube-list/src/app/core/models/video-item.model';
import { map, Observable, switchMap } from 'rxjs';

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoDetailsComponent {
  @HostBinding('class.full-space-list') videoDetailsClass = true;

  rating: VideoRationModel = {
    id: undefined,
    rating: 0,
  };

  videoDetailsResponse$: Observable<VideoItemModel> = this.route.data.pipe(
    map((data) => data.videoDetails),
    switchMap((result) => {
      return this.afs
        .doc<VideoRationModel>(`videosRatings/${result.id}`)
        .snapshotChanges()
        .pipe(
          map((firestoreResponse) => {
            return {
              ...result,
              videoRating: firestoreResponse.payload.data()?.rating,
              videoFavouring: firestoreResponse.payload.data()?.favorite,
            } as VideoItemModel;
          })
        );
    })
  );

  ratingStars = Array.from({ length: 4 }, (x, i) => i + 1);

  private RatingCollection: AngularFirestoreCollection<VideoRationModel> =
    this.afs.collection<VideoRationModel>('videosRatings');

  allRatings$: Observable<VideoRationModel[]> =
    this.RatingCollection.valueChanges();

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {
    console.log('test');
  }

  addRatingFavorite(index: string, rating?: number, favorite?: boolean) {
    console.log(index, rating, favorite);
    this.RatingCollection.doc(index).set({
      rating,
      favorite,
    });
  }
}
