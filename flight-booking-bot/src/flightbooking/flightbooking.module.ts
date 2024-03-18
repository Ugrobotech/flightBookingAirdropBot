import { Module } from '@nestjs/common';
import { FlightbookingController } from './flightbooking.controller';
import { Flightbooking } from './flightbooking';

@Module({
  controllers: [FlightbookingController],
  providers: [Flightbooking]
})
export class FlightbookingModule {}
