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

  async getLast25Stories(){
    let { data } = await firstValueFrom(this.httpService.get(this.getNewStories500Url));
    let str = '';
    
    let urls = data.slice(0, 25)
                .map((i)=>{
                  return 'https://hacker-news.firebaseio.com/v0/item/'+ i +'.json?print=pretty'; 
                });
    
    Promise.all(urls.map(i=>{
      return fetch(i)
      .then(res => res.json())
      .then(data => data)
    })).then((data)=>{
      let result = data.map((i)=>{
        const { title } = i;
        return title;
      })
      .join(" ")
      .replace(/[\s]/gmi, "AAAAABBBBBCCCCC")
      .replace(/[\W]/gmi, "")
      .split("AAAAABBBBBCCCCC");
      
      //Get frequency
      const getFrequency = (arr, word)=>{
        let count = 0;
        arr.forEach((item) => {
          if(word == item){
            count += 1;
          }
        });

        return count;
      };

      //Unique words
      let arr1 = [... new Set(result)];
      let result_array = arr1.map((item)=>{
        let object = {
          "word": item,
          "frequency": getFrequency(result, item)
        };

        return object;
      })
      .sort((a, b)=>{
        return a.frequency - b.frequency;
      })
      .reverse()
      .slice(0, 10);

      console.log(result_array);
      console.log('Unique: ' + arr1.length);
      console.log('Raw: ' + result.length);
    })

    console.log(urls);
    // data.slice(0, 25)
    //     .forEach((item)=>{
    //         this.getTitleOfStory(item)
    //           .then(res => res.json())
    //           .then((data: {title: ''})=>{
    //             const { title } = data;
    //             str += title;
    //           }).toString();
    //     });
    // console.log(str);
    return str;
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
