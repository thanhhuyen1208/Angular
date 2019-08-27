import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { Config } from 'protractor';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})

export class ConfigComponent implements OnInit {
  
  config: Config;
  
  headers: string[];
  error: any;
  
   
  constructor( private configService: ConfigService) { }

  ngOnInit() {
  }

  showConfig() {
    this.configService.getConfig()
    .subscribe(
      (data: Config) => this.config = { ...data},  //success path
      error => this.error = error //error path
    );
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
    .subscribe( resp => {
      const keys = resp.headers.keys();
      this.headers = keys.map( key =>
        `${key}: ${resp.headers.get(key)}`);

        this.config = { ...resp.body};
    })
  }
}
