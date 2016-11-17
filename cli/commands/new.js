'use strict';

// ======================
// Depends
// ======================
const colors = require('colors');
const childProcess = require('child_process');

/**
 * SHIP.CLI.new
 * @param  {object}   program [description]
 * @param  {object}   config  [description]
 * @return {boolean}
 */
module.exports = function(program, config) {
  program
    .command('new [name]')
    .alias('n')
    .description(colors.yellow('create ship application'))
    .action(function(name) {
      const { dir, cwd } = config;
      this.parent.log(`App will create at: ${dir}/${name}`);
      try {
        childProcess.execSync(`mkdir ${dir}/${name}`, { cwd: cwd });
      } catch (err) {
        this.parent.log(`Error: Folder '${dir}/${name}' is exists`, 'red');
        return;
      }

      let instalation = childProcess.exec(`
        cd ${dir}/${name} &&
        curl -LOk ${config.generator} && 
        tar -xzf master.tar.gz --strip-components=1 -C ./ &&
        rm master.tar.gz
        ${cwd}/node_modules/.bin/yarn`, { cwd: dir }, () => {
          this.parent.log('Instalation completed', 'green');
          this.parent.log(`Project folder: ${dir}/${name}`, 'green');
        }
      );

      instalation.stdout.pipe(process.stdout);
    });
};
