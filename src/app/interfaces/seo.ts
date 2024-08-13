export interface SEOData {
    data: SEOObject[]
}

export interface SEOObject {
    id: number;
    title: string;
    keywords: string;
    robots: string;
    description: string;
    seo_schema: string;
    og_type: string;
    og_title: string;
    og_url: string;
    author: string;
    facebook_description: string;
    facebook_image: string;
    facebook_page_id: number;
    facebook_advert_pixel_tag: string;
    facebook_site_name: string;
    facebook_admins: number;
    twitter_title: string;
    twitter_description: string;
    twitter_image: string;
    twitter_site: string;
    twitter_label1: string;
    twitter_data1: string;
    twitter_card: string;
    google_site_verification: string;
    google_tag_manager_header: string;
    google_tag_manager_body: string;
    google_analytics: string;
    revisit_after: number;
    canonical_url: string;
    yahoo_key: string;
    yandex_verification: string;
    microsoft_validate: string;
    pingback_url: string;
    alexa_code: string;
    live_chat_tag: string;
    footer_script: string;
    created_at: Date;
    updated_at: Date;
}
