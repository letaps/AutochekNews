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
  async mostOccurringWordsInTitlesOfTheLast25Stories(): Promise<string> {
    this.logger.log(">>>>>>>>>>Top 10 most occurring words in the titles of the last 25 stories<<<<<<<<<<");
    return this.appService.getLast25Stories();
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
