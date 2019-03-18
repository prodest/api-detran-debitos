import { Module } from '@nestjs/common';
import { VeiculosController } from '../controllers/veiculos.controller';
import { VeiculosService } from '../services/veiculos.service';
import { DetranSoapClient } from '../repository/__mocks__/detran-soap-client';

@Module( {
  controllers: [ VeiculosController ],
  providers: [ VeiculosService, DetranSoapClient ],
} )
export class DetranModule { }
