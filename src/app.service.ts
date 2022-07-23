import { Injectable,Logger, Response } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import fetch from 'node-fetch';
import { Story } from './Story';
import { stringify } from 'querystring';
import e, { response } from 'express';

@Injectable()
export class AppService { 
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger(AppService.name)
  private readonly getMaximumIDUrl = 'https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty';
  private readonly getNewStories500Url = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';


  async getHello(): Promise <string> {
    return await 'Hello World Tapiwa!';
  }

  async getLast25Stories(): Promise <any>{
    let { data } = await firstValueFrom(this.httpService.get(this.getNewStories500Url));
    let str = '';
    
    let urls = data.slice(0, 25)
                .map((i)=>{
                  return 'https://hacker-news.firebaseio.com/v0/item/'+ i +'.json?print=pretty'; 
                });
    
    return Promise.all(urls.map(i=>{
      return fetch(i)
      .then(res => res.json())
      .then(data => data)
    }))
  } 

  async getTitleOfStory (id : String) {
    const getItemUrl = 'https://hacker-news.firebaseio.com/v0/item/'+ id +'.json?print=pretty'; 
    this.logger.log(Date.now + 'About to call the url : '+ getItemUrl ); 
    const result = await fetch(getItemUrl);  
    return result;
  }

  // async getLast25Stories() {   
  //   this.logger.log(Date.now + "About to call the url : "+ this.getNewStories500Url)
  //   const { data } = await firstValueFrom(this.httpService.get(this.getNewStories500Url));
  //   this.createStringOfAllTitles(data)
  //   return await {... data};
  // }

  // createratingOfReccuring(sentence : string){

  // }


  // async getTitleOfStory (id : String) {
  //   const getItemUrl = 'https://hacker-news.firebaseio.com/v0/item/'+ id +'.json?print=pretty'; 
  //   this.logger.log(Date.now + 'About to call the url : '+ getItemUrl ); 
  //   const result = await fetch(getItemUrl);  
  //   return result;
  // }
  

  // async createStringOfAllTitles (data : String) {
  //   this.logger.log('Response of all IDS from Server : ' + data);
  //   var arrayOfStoryIDs = data.toString().split(',');
  //   let stringOfTitles = '' ;
  //   // for (let i = 0; i < 25; i++) {
  //   //   this.getTitleOfStory(arrayOfStoryIDs[i].toString());
  //   // }

  //   // [...Array(25).keys()].forEach(async (item, index)=>{
  //   //   // await this.getTitleOfStory(arrayOfStoryIDs[item])
  //   //   // .then((data)=>{
  //   //   //   console.log('hdytfdjyt' + data);
  //   //   // })
  //   //   // .catch((error)=>{
  //   //   //   console.log(data);
  //   //   // }); 

  //   //   // await this.getTitleOfStory(arrayOfStoryIDs[1])
  //   //   // .then((data)=>{
  //   //   //   console.log('hdytfdjyt' + data);
  //   //   // })
  //   //   // .catch((error)=>{
  //   //   //   console.log(data);
  //   //   // });

  //   //   console.log(JSON.stringify(this.getTitleOfStory(arrayOfStoryIDs[item])));
  //   // })
  //   //this.getTitleOfStory(arrayOfStoryIDs[0]).then((data)=>{console.log('jsfhbsdfv ' + JSON.stringify(data))});
  //   console.log(arrayOfStoryIDs())
  //   return true;
  // }
}
