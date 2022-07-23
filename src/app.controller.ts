import { Logger,Body, Controller, Get, Param  } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    
  }

  private readonly logger = new Logger(AppController.name)

  @Get()

  getHello(){
    return this.getHello();
  }

  @Get('last25Stories/')
  async mostOccurringWordsInTitlesOfTheLast25Stories(): Promise<any> {
    this.logger.log(">>>>>>>>>>Top 10 most occurring words in the titles of the last 25 stories<<<<<<<<<<");
    return this.appService.getLast25Stories().then((data)=>{
      let result = data.map((i)=>{
        const { title } = i;
        return title;
      })
      .join(" ")
      .replace(/[\s]/gmi, "AAAAABBBBBCCCCC")
      .replace(/[\W]/gmi, "")
      .split("AAAAABBBBBCCCCC")
      .map((word)=>word.toLowerCase());
      
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
      return result_array;
    });
  }

  @Get('postExactlyLastWeek/:term')
  public async   samplmostOccurringWordsInTitlesOfThePostOfExactlyLastWeek(@Param('term') term: string): Promise<string> {
    this.logger.log(">>>>>>>>>>Top 10 most occurring words in the titles of the post of exactly the last week<<<<<<<<<<");
    return await `your term: ${term}`;
  }

  @Get('storiesWith10Karma/:term')
  public async   samplmostOccurringWordsInTitlesOfTheLast600StoriesOfUsersWithAtLeast10Karma(@Param('term') term: string): Promise<string> {
    this.logger.log(">>>>>>>>>>Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma<<<<<<<<<<");
    return await `your term: ${term}`;
  }

}
