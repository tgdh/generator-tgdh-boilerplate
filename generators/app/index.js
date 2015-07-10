'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

	initializing: function() {
		// Have Yeoman greet the user
		this.log(yosay(chalk.bold(
			'Welcome to the ') + chalk.bold.cyan('TGDH boilerplate') + chalk.bold(' generator!'
		)));
		this.log(chalk.bold.cyan(
			'Out of the box, I create a new starter project with \n' +
			'a grunt workflow, bower & a base Umbraco directory. \n'
		));

		this.log(chalk.bold.cyan(
			'Version: ' + this.version + '\n'
		));
	},

	prompting: function() {
		var done = this.async();

		var prompts = [{
			name: 'projectName',
			message: 'What is the project name?',
			default: this.appname
		},
		{
			name: 'siteUrl',
			message: 'What is the site url?',
			default: 'domain.co.uk'
		}];

		this.prompt(prompts, function (props) {
			this.props = props;
			// To access props later use this.props.someOption;
			done();
		}.bind(this));
	},

	writing: {
		app: function() {
			var projectNameSlug = this.props.projectName.toLowerCase().replace(' ','-');

			this.fs.copyTpl(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json'),
				{ projectName: projectNameSlug }
			);
			this.fs.copy(
				this.templatePath('_Gruntfile.js'),
				this.destinationPath('Gruntfile.js')
			);
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				{ 
					projectName: projectNameSlug,
					siteUrl: this.props.siteUrl
				}
			);
			this.fs.copyTpl(
				this.templatePath('_README.md'),
				this.destinationPath('README.md'),
				{ projectName: this.props.projectName }
			);
			this.fs.copyTpl(
				this.templatePath('_robots.txt'),
				this.destinationPath('robots.txt'),
				{ siteUrl: this.props.siteUrl }
			);
		},

		projectfiles: function() {
			this.fs.copy(
				this.templatePath('bowerrc'),
				this.destinationPath('.bowerrc')
			);
			this.fs.copy(
				this.templatePath('editorconfig'),
				this.destinationPath('.editorconfig')
			);
			this.fs.copy(
				this.templatePath('gitignore'),
				this.destinationPath('.gitignore')
			);
			this.fs.copy(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc')
			);
		},

		projectFolders: function() {
			this.directory(
				this.templatePath('assets'),
				this.destinationPath('assets')
			);
			this.directory(
				this.templatePath('tasks'),
				this.destinationPath('tasks')
			);
			this.directory(
				this.templatePath('umbraco'),
				this.destinationPath('umbraco')
			);
		}
	},

	install: function () {
		this.installDependencies();
	},

	end: function() {

		this.log(chalk.bold.cyan(
			'\n You\'re all good to go :) \n'
		));

	}

});
