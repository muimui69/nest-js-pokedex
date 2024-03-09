import { Injectable } from '@nestjs/common';
// import axios, { AxiosInstance } from 'axios';
import { PokemonReponse } from './interfaces/pokemon-reponse.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  // private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async executedSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokemonReponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    // * Forma no optima
    // const insertPromisesArray = [];

    // data.results.forEach(({ name, url }) => {
    //   const segments = url.split('/');
    //   const nr = +segments[segments.length - 2];

    //   // await this.pokemonModel.create({name,nr})
    //   insertPromisesArray.push(
    //     this.pokemonModel.create({ name, nr })
    //   )
    // })

    // await Promise.all(insertPromisesArray);


    // * Forma optima
    const pokemonToInsert: { name: string, nr: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const nr = +segments[segments.length - 2];

      pokemonToInsert.push({ name, nr });
    })

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }
}
