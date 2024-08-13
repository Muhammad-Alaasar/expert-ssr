import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SEOService } from '../../services/seo.service';
import { SEOData, SEOObject } from '../../interfaces/seo';
import { Location } from '@angular/common';

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {

    constructor(
        private seoService: SEOService,
        private _location: Location
    ) { }

    ngOnInit(): void {
        this.getSEOData();
        console.log("Test Component");
    }

    getSEOData() {
        this.seoService.getSEOData<SEOData>().subscribe((res: SEOData) => {
            const SEOData: SEOObject = res.data[0];
            this.seoService.updateCanonicalUrl(SEOData.og_url + this._location.path());
            this.seoService.setSEOData(SEOData);
        });
    }
}
