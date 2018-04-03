import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { switchMap } from 'rxjs/operators/switchMap';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { SearchService } from '../../../services/search.service';
import { GalleryModel } from '../../../models/gallery-model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() onGalleryListUpdate = new EventEmitter<GalleryModel[]>();

  searchTerm = new FormControl();

  constructor(
    private searchService: SearchService
  ) {
    this.searchTerm.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => searchService.search(term))
    ).subscribe(res => this.onSearch(res));
  }

  ngOnInit(): void {
    this.searchTerm.setValue('');
  }

  onSearch(res: GalleryModel[]): void {
    this.onGalleryListUpdate.emit(res);
  }
}
