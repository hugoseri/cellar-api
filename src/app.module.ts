import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CellarController } from './cellar.controller';
import { CellarService } from './cellar.service';
import { Cellar } from './cellar';

@Module({
  imports: [],
  controllers: [AppController, CellarController],
  providers: [AppService, CellarService],
})
export class AppModule {}
