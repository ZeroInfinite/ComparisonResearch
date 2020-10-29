import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Repo } from '../models/repo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  repos: Repo[];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getURL(language, sort) {
    let url = 'https://api.github.com/search/repositories?q=language:'+language+'+created&sort=stars&order='+sort;
    return url;
  }

  getGithubRecent(language, sort) {
    let url = this.getURL(language, sort);
    return this.http.get(url);
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.getGithubRecent(params.language, params.sort)
          .subscribe(data => {
            this.repos = data['items'];
          })
      }
    );
  }

}
