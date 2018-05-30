import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { GalleryModel } from '../../../models/gallery.model';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() onGalleryListUpdate = new EventEmitter<GalleryModel[]>();

  searchTerm = new FormControl();

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {
    this.searchTerm.valueChanges.pipe(
      debounceTime(50),
      distinctUntilChanged(),
      switchMap(term => searchService.search(term))
    ).subscribe(res => this.onSearch(res));
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(map => {
      this.searchTerm.setValue(map.get('q') || '');
    });
  }

  onSearch(res: GalleryModel[]): void {
    this.onGalleryListUpdate.emit(res);
  }
}
