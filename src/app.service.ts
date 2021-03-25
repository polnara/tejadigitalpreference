import { Injectable, HttpService } from '@nestjs/common';
import {Request} from './model/request.model';
import { DigitalRequest } from './model/digitalPreference/request.model';
import {Header} from './model/digitalPreference/header.model';
import { Preferences} from './model/digitalPreference/preferences.model';
import * as config from './config';
import {DegitalPreferenceResponse} from './model/digitalPreference/response.model';
import {transform} from 'camaro';
import { DigitalPreferencesDetails } from './model/digitalPreference/DigitalPreferencesDetails.model';
import { AxiosResponse } from 'axios'
import { plainToClass } from 'class-transformer';
@Injectable()
export class AppService {


  constructor(private http:HttpService){

  }

  getHello(): string {
    return 'Hello World!';
  }
  handlePreferenceRequest(request:Request){
    // handle member id encryption

    //json to xml conversion

    let digitalRequest:DigitalRequest = this.convertToXml(request);
    
    // send request
    let endpoint = config.enpoint_url;
    
    let response = this.http.post(endpoint,digitalRequest, {headers:{"content-type":"application/xml"}}).toPromise();
    
    response.then((msg:AxiosResponse<DegitalPreferenceResponse>) => {this.convertToJSON(msg.data)})

    // xml to json conversion
    // return json
  }

  convertToJSON(response:DegitalPreferenceResponse){
    let res:DigitalPreferencesDetails = plainToClass( DigitalPreferencesDetails, response)
    console.log(res.getDigitalPreferencesResponse);
    return response;
  }
  convertToXml(request:Request):DigitalRequest{
    // header setting
    let header:Header = new Header();
    header.serviceName = "IntegratedCustomerExpService";
    header.operationName = "getDigitalPreferences";
    header.version = "1.0";
    header.channelName = request.header.channelName;
    header.deviceType = request.header.deviceType;
    header.source = request.header.source;
    header.refId = "Id-32ff5b5f090076522f618f02";
    header.tokenId = request.header.tokenID;
    header.responseFormat = "xml";

    // preferences setting
    let preference:Preferences = new Preferences();
    preference.memberIdentifier = request.preferences.memberID;
    preference.lineOfBusinessText = request.preferences.lineOfBusinessText;
    preference.lineOfBusinessIdentifier = request.preferences.lineOfBusinessIdentifier;
    preference.systemIdentifier = request.preferences.systemIdentifier;
    preference.preferenceLevel = request.preferences.preferenceLevel;
    preference.preferenceType = request.preferences.preferenceType;
    preference.preferenceName = "";
    preference.preferenceIdentifier = "";

    let digitalRequest : DigitalRequest = new DigitalRequest();
    // digitalRequest.header = header;
    digitalRequest.preferences = preference;

    
    return digitalRequest;
  }
}
