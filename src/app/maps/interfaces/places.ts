 // Generated by https://quicktype.io

export interface PlacesResponse {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:            string;
    type:          string;
    place_type:    string[];
    relevance:     number;
    properties:    Properties;
    text_es:       string;
    place_name_es: string;
    text:          string;
    place_name:    string;
    text_en:       string;
    place_name_en: string;
    center:        number[];
    geometry:      Geometry;
    address:       string;
    context:       Context[];
}

export interface Context {
    id:           string;
    text_es:      string;
    text:         string;
    text_en:      string;
    wikidata?:    string;
    language_es?: Language;
    language?:    Language;
    language_en?: Language;
    short_code?:  string;
}

export enum Language {
    En = "en",
    Es = "es",
}

export interface Geometry {
    type:          string;
    coordinates:   number[];
    interpolated?: boolean;
    omitted?:      boolean;
}

export interface Properties {
    accuracy:             string;
    "override:postcode"?: string;
}
