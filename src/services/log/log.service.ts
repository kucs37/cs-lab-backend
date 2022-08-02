import * as winston from 'winston';
import * as chalk from 'chalk';
import * as moment from 'moment';
export class LogService {
  private tag = '';
  private logger = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    // defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'debug.log' }),
    ],
  });

  constructor(private tags: string) {
    this.tag = tags;
  }

  // private setTag(tags: string) {
  //     this.tag = tags;
  // }

  private getDate() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }

  info(...args: any) {
    this.logger.info(
      chalk.hex('#54C1E9')(
        `[${this.getDate()}][${this.tag}] =>  ${this.toString(args)} `,
      ),
    );
  }
  debug(...args: any) {
    this.logger.debug(
      chalk.hex('#8CD10D')(
        `[${this.getDate()}][${this.tag}] =>  ${this.toString(args)} `,
      ),
    );
  }
  warn(...args: any) {
    this.logger.warn(
      chalk.hex('#FAC848')(
        `[${this.getDate()}][${this.tag}] =>  ${this.toString(args)} `,
      ),
    );
  }
  error(...args: any) {
    // tslint:disable-next-line:no-console
    console.log(`[${this.getDate()}][${this.tag}] =>  `, args);
    this.logger.error(
      chalk.hex('#F95C5A')(
        `[${this.getDate()}][${this.tag}] =>  ${this.toString(args)} `,
      ),
    );
  }

  db(...args: any) {
    this.logger.debug(
      chalk.hex('#f9f9f9')(
        `[${this.getDate()}][${this.tag}] =>  ${this.toString(args)} `,
      ),
    );
  }

  private toString(args: any) {
    let str = '';
    for (const key in args) {
      if (args.hasOwnProperty(key)) {
        const element = args[key];
        if (typeof element === 'object') {
          try {
            str += JSON.stringify(element) + ' ';
          } catch (error) {
            // tslint:disable-next-line:no-console
            console.error(error);
          }
        } else {
          str += element + ' ';
        }
      }
    }
    return str;
  }
}
