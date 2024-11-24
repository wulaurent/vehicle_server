// src/index.ts
import { Command } from 'commander';

const program = new Command();

program
  .name('my-cli-tool')
  .description('Un outil en ligne de commande TypeScript')
  .version('1.0.0');

program
  .command('hello')
  .description('Affiche un message de salutation')
  .action(() => {
    console.log('Bonjour, bienvenue sur mon outil CLI !');
  });

program.parse(process.argv);
