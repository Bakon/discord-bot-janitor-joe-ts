## Janitor Joe, the Discord bot

Janitor Joe is the friendly Discord bot that is always cleaning up after your mess.<br>

### `Tools used in this project`
[Discord.js](https://redux.js.org/)<br>
[TypeScript](https://www.typescriptlang.org/)<br>

## Available Commands
If the bot is added to your Discord server, you can run certain commands.<br>
The prefix to run those commands is '!' (without quotes).

### `--kick (username)`
Will kick the @mentioned user.<br>
Can given a third parameter, which would be the reasoning, which is optional.<br>
If no reason is specified, it will say this in the respective server log.

### `--ban (username)`
Exactly the same as kick, but will ban the mentioned user instead.

### `--champion`
Returns a random champion from [League of Legends](https://leagueoflegends.com)<br>
If given the parameter 'top', 'mid', 'jungle', 'adc' or 'support', it will return champions respectively to those lanes.

### `--coinflip`
Does a coinflip to 'predict' the result of your next game.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the bot in development mode. <br>
In development mode it uses [Nodemon](https://nodemon.io/) to watch Node processes and restarts those when you save a file.<br>
After adding the bot to your server you can execute the above mentioned commands.

### `npm run build`

Builds the whole project, compiles all the TypeScript to JavaScript.<br>
This will put everything in a folder called 'dist'.

### `npm run start`

Runs the build version of the project <br>