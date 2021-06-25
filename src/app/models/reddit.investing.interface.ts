/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */
export interface RedditInvestingAPI {
    code:   number;
    reddit: Reddit;
}

export interface Reddit {
    data: Investing[];
}

export interface Investing {
    approved_at_utc:               null;
    subreddit:                     Subreddit;
    selftext:                      string;
    author_fullname:               string;
    saved:                         boolean;
    mod_reason_title:              null;
    gilded:                        number;
    clicked:                       boolean;
    title:                         string;
    link_flair_richtext:           any[];
    subreddit_name_prefixed:       SubredditNamePrefixed;
    hidden:                        boolean;
    pwls:                          number;
    link_flair_css_class:          null;
    downs:                         number;
    top_awarded_type:              null;
    hide_score:                    boolean;
    name:                          string;
    quarantine:                    boolean;
    link_flair_text_color:         LinkFlairTextColor;
    upvote_ratio:                  number;
    author_flair_background_color: null;
    subreddit_type:                SubredditType;
    ups:                           number;
    total_awards_received:         number;
    media_embed:                   MediaEmbed;
    author_flair_template_id:      null;
    is_original_content:           boolean;
    user_reports:                  any[];
    secure_media:                  null;
    is_reddit_media_domain:        boolean;
    is_meta:                       boolean;
    category:                      null;
    secure_media_embed:            MediaEmbed;
    link_flair_text:               null;
    can_mod_post:                  boolean;
    score:                         number;
    approved_by:                   null;
    is_created_from_ads_ui:        boolean;
    author_premium:                boolean;
    thumbnail:                     string;
    edited:                        boolean | number;
    author_flair_css_class:        null;
    author_flair_richtext:         any[];
    gildings:                      Gildings;
    content_categories:            null;
    is_self:                       boolean;
    mod_note:                      null;
    created:                       number;
    link_flair_type:               FlairType;
    wls:                           number;
    removed_by_category:           null;
    banned_by:                     null;
    author_flair_type:             FlairType;
    domain:                        Domain;
    allow_live_comments:           boolean;
    selftext_html:                 string;
    likes:                         null;
    suggested_sort:                null;
    banned_at_utc:                 null;
    view_count:                    null;
    archived:                      boolean;
    no_follow:                     boolean;
    is_crosspostable:              boolean;
    pinned:                        boolean;
    over_18:                       boolean;
    all_awardings:                 AllAwarding[];
    awarders:                      any[];
    media_only:                    boolean;
    can_gild:                      boolean;
    spoiler:                       boolean;
    locked:                        boolean;
    author_flair_text:             null;
    treatment_tags:                any[];
    visited:                       boolean;
    removed_by:                    null;
    num_reports:                   null;
    distinguished:                 null;
    subreddit_id:                  SubredditID;
    mod_reason_by:                 null;
    removal_reason:                null;
    link_flair_background_color:   string;
    id:                            string;
    is_robot_indexable:            boolean;
    report_reasons:                null;
    author:                        string;
    discussion_type:               null;
    num_comments:                  number;
    send_replies:                  boolean;
    whitelist_status:              WhitelistStatus;
    contest_mode:                  boolean;
    mod_reports:                   any[];
    author_patreon_flair:          boolean;
    author_flair_text_color:       null;
    permalink:                     string;
    parent_whitelist_status:       WhitelistStatus;
    stickied:                      boolean;
    url:                           string;
    subreddit_subscribers:         number;
    created_utc:                   number;
    num_crossposts:                number;
    media:                         null;
    is_video:                      boolean;
    comments:                      any[];
}

export interface AllAwarding {
    giver_coin_reward:                    number | null;
    subreddit_id:                         null;
    is_new:                               boolean;
    days_of_drip_extension:               number;
    coin_price:                           number;
    id:                                   string;
    penny_donate:                         number | null;
    award_sub_type:                       AwardSubType;
    coin_reward:                          number;
    icon_url:                             string;
    days_of_premium:                      number;
    tiers_by_required_awardings:          { [key: string]: TiersByRequiredAwarding } | null;
    resized_icons:                        Icon[];
    icon_width:                           number;
    static_icon_width:                    number;
    start_date:                           null;
    is_enabled:                           boolean;
    awardings_required_to_grant_benefits: number | null;
    description:                          string;
    end_date:                             null;
    subreddit_coin_reward:                number;
    count:                                number;
    static_icon_height:                   number;
    name:                                 string;
    resized_static_icons:                 Icon[];
    icon_format:                          null | string;
    icon_height:                          number;
    penny_price:                          number | null;
    award_type:                           AwardType;
    static_icon_url:                      string;
}

export enum AwardSubType {
    Global = 'GLOBAL',
    Group = 'GROUP',
}

export enum AwardType {
    Global = 'global',
}

export interface Icon {
    url:     string;
    width:   number;
    height:  number;
    format?: null | string;
}

export interface TiersByRequiredAwarding {
    resized_icons:        Icon[];
    awardings_required:   number;
    static_icon:          Icon;
    resized_static_icons: Icon[];
    icon:                 Icon;
}

export enum FlairType {
    Text = 'text',
}

export enum Domain {
    SelfInvesting = 'self.investing',
}

export interface Gildings {
    gid_1?: number;
}

export enum LinkFlairTextColor {
    Dark = 'dark',
}

export interface MediaEmbed {
}

export enum WhitelistStatus {
    AllAds = 'all_ads',
}

export enum Subreddit {
    Investing = 'investing',
}

export enum SubredditID {
    T52Qhhq = 't5_2qhhq',
}

export enum SubredditNamePrefixed {
    RInvesting = 'r/investing',
}

export enum SubredditType {
    Public = 'public',
}
