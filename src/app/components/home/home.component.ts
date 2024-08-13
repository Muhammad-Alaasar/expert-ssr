import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SEOData, SEOObject } from '../../interfaces/seo';
import { SEOService } from '../../services/seo.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

    constructor(
        private seoService: SEOService,
    ) { }

    ngOnInit(): void {
        this.getSEOData();
        console.log("Home Component");
    }

    getSEOData() {
        this.seoService.getSEOData<SEOData>().subscribe((res: SEOData) => {
            const SEOData: SEOObject = res.data[0];
            this.seoService.updateCanonicalUrl(SEOData.og_url + SEOData.canonical_url);
            this.seoService.setSEOData(SEOData);
        });
    }
}
