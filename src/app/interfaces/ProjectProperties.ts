export interface ProjectPropertiesModel {
    propertiesMap?: any;
    statesList?: Array<string>;
    countryList?: Array<string>;
}

export interface ProjectPropertiesRequest {
    propertyName?: string;
    value?: string;
    type?: string;
}

export interface ProjectPropertiesResponse {
    propertiesMap?: any;
    status?: boolean;
    errors?: any;
}