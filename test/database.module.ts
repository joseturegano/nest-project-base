import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseHelper } from './database.helper';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const uri = await DatabaseHelper.createConnection();
        return { uri };
      },
    }),
  ],
  providers: [DatabaseHelper],
  exports: [DatabaseHelper],
})
export class TestDatabaseModule {}
