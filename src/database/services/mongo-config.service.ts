import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    const uri = this.getUri();
    return { uri };
  }

  private getUri(): string {
    const host = this.configService.get('database.host');
    const port = this.configService.get('database.port');
    const user = this.configService.get('database.user');
    const password = this.configService.get('database.password');
    const db = this.configService.get('database.db');
    return `mongodb://${user}:${password}@${host}:${port}/${db}?authSource=admin&connectTimeoutMS=5000`;
  }
}
