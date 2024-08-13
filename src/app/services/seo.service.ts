import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';
import { SEOObject } from '../interfaces/seo';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class SEOService {

    private renderer: Renderer2;
    SEOObject!: SEOObject[];

    constructor(
        private http: HttpClient,
        private _meta: Meta,
        private _title: Title,
        private rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private _document: Document,
    ) { this.renderer = this.rendererFactory.createRenderer(null, null) }

    getSEOData<T>(): Observable<T> {
        return this.http.get<T>('https://admin.ask-aladdin.com/api/global-seo/en');
    }

    setSEOData(data: SEOObject) {
        this._title.setTitle(data.title);
        this._meta.updateTag({ name: 'description', content: data.description });
        this._meta.updateTag({ name: 'robots', content: data.robots });
        this._meta.updateTag({ name: 'keywords', content: data.keywords });

        const scriptTag =
            this._document.getElementById('schema') ||
            this.renderer.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.text = data.seo_schema;
        if (!this._document.getElementById('schema')) {
            this.renderer.appendChild(this._document.head, scriptTag);
        }

        this._meta.updateTag({ property: 'og:locale', content: 'en_US' });
        this._meta.updateTag({ property: 'og:type', content: data.og_type });
        this._meta.updateTag({ property: 'og:title', content: data.og_title });
        this._meta.updateTag({ property: 'og:description', content: data.facebook_description });
        this._meta.updateTag({ property: 'og:url', content: data.og_url });
        this._meta.updateTag({ property: 'og:site_name', content: data.author });
        this._meta.updateTag({ property: 'og:image', content: data.facebook_image });
        this._meta.updateTag({ property: 'fb:admins', content: data.facebook_admins.toString() });
        this._meta.updateTag({ property: 'fb:page_id', content: data.facebook_page_id.toString() });
        this._meta.updateTag({ name: 'twitter:title', content: data.twitter_title });
        this._meta.updateTag({ name: 'twitter:description', content: data.twitter_description });
        this._meta.updateTag({ name: 'twitter:image', content: data.twitter_image });
        this._meta.updateTag({ name: 'twitter:site', content: data.twitter_site });
        this._meta.updateTag({ name: 'twitter:card', content: data.twitter_card });
        this._meta.updateTag({ name: 'twitter:url', content: "" });
        this._meta.updateTag({ name: 'twitter:label1', content: data.twitter_label1 });
        this._meta.updateTag({ name: 'twitter:data1', content: data.twitter_data1 });
        this._meta.updateTag({ name: 'author', content: data.author });
        this._meta.updateTag({ name: 'revisit-after', content: data.revisit_after.toString() });
        this._meta.updateTag({ name: 'msvalidate.01', content: data.microsoft_validate });
        this._meta.updateTag({ name: 'google-site-verification', content: data.google_site_verification });
        this._meta.updateTag({ name: 'yandex-verification', content: data.yandex_verification });
    }

    updateCanonicalUrl(url: string) {
        const head = this._document.getElementsByTagName('head')[0];
        let element =
            this._document.querySelector(`link[rel='canonical']`) || null;
        if (!element) {
            element = this._document.createElement('link') as HTMLLinkElement;
            head.appendChild(element);
        }
        element.setAttribute('rel', 'canonical');
        element.setAttribute('href', url);
    }
}
