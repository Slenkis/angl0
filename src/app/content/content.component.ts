import {Component, OnInit} from '@angular/core';
import {Photo, PhotosService} from "../services/photos.service";
import {Profile, ProfilesService} from "../services/profiles.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {range} from "rxjs";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [
    trigger("profileAnimation", [
      transition(":enter", [
        animate(
          100,
          keyframes([
            style({opacity: 0, offset: 0}),
            style({opacity: 1, offset: 1})
          ])
        )
      ]),
      transition(":leave", [
        animate(
          100,
          keyframes([
            style({opacity: 1, offset: 0}),
            style({opacity: 0, offset: 1})
          ])
        )]
      )
    ])]
})
export class ContentComponent implements OnInit {
  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  private generateProfiles(): Profile[] {
    let arr: Profile[] = []
    for (let i = 0; i < 40; i++) {
      arr.push(
        new Profile(
          this.getRandomInt(1, 20),
          (Math.random() + 1).toString(36).substring(7)
        )
      )
    }
    return arr
  }

  // profiles: Profile[] = []
  profiles: Profile[] = this.generateProfiles()
  photos: Photo[] = []

  form: FormGroup = new FormGroup({
    id: new FormControl(null, [
      Validators.required,
    ]),
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern('[А-яA-z0-9]+')
    ])
  })

  constructor(private photosService: PhotosService, private profilesService: ProfilesService) {
  }

  ngOnInit(): void {
    // this.loadProfiles()
    console.log(range(5, 8))
  }

  loadPhotos(id: number, offset: number) {
    this.photosService.fetchPhotos(id, offset)
      .subscribe(photos => {
        this.photos = photos
      })
  }

  identify(index: number, profile: Profile) {
    return profile.id;
  }

  addProfile(id: number, name: string) {
    this.profilesService
      .addProfile(id, name)
      .pipe(
        tap(response => {
            console.log(response.status)
            if (response.status === 201 || response.status === 202) {
              this.form.reset()
              this.loadProfiles()
            }
          }
        )
      )
      .subscribe()
  }

  loadProfiles() {
    this.profilesService
      .fetchProfiles()
      .subscribe(profiles => {
        this.profiles = profiles
      })
  }

  deleteProfile(id: number) {
    this.profilesService
      .removeProfile(id)
      .pipe(
        tap(response => {
            console.log(response.status)
            if (response.status === 200) {
              this.loadProfiles()
            }
          }
        )
      )
      .subscribe()
  }

  //TODO
  openPhoto(id: number) {
  }
}
