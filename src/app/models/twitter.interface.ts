/* eslint-disable @typescript-eslint/naming-convention */
export interface TwitterAPI {
    twitter: Twitter[];
}

export interface Twitter {
    id:                string;
    verified:          boolean;
    username:          string;
    name:              string;
    profile_image_url: string;
    tweets:            Tweets;
}

export interface Tweets {
    data:     Data[];
    includes: Includes;
}

export interface Data {
    created_at:     Date;
    text:           string;
    public_metrics: PublicMetrics;
    id:             string;
    attachments?:   Attachments;
}

export interface Attachments {
    media_keys: string[];
}

export interface PublicMetrics {
    retweet_count: number;
    reply_count:   number;
    like_count:    number;
    quote_count:   number;
}

export interface Includes {
    media: Media[];
}

export interface Media {
    media_key:          string;
    preview_image_url?: string;
    type:               Type;
    url?:               string;
}

export enum Type {
    AnimatedGIF = 'animated_gif',
    Photo = 'photo',
    Video = 'video',
}
