# encoding: utf-8

require 'rubygems'
require 'bundler'
begin
  Bundler.setup(:default, :development)
rescue Bundler::BundlerError => e
  $stderr.puts e.message
  $stderr.puts "Run `bundle install` to install missing gems"
  exit e.status_code
end
require 'rake'

require 'jeweler'
Jeweler::Tasks.new do |gem|
  # gem is a Gem::Specification... see http://docs.rubygems.org/read/chapter/20 for more options
  gem.name = "nyc-greenmarkets"
  gem.homepage = "http://github.com/WIZARDISHUNGRY/nyc-greenmarkets"
  gem.license = "MIT"
  gem.summary = %Q{TODO: one-line summary of your gem}
  gem.description = %Q{TODO: longer description of your gem}
  gem.email = "jonathan.williams@gmail.com"
  gem.authors = ["Jon Williams"]
  # dependencies defined in Gemfile
end
Jeweler::RubygemsDotOrgTasks.new

require 'rake/testtask'
Rake::TestTask.new(:test) do |test|
  test.libs << 'lib' << 'test'
  test.pattern = 'test/**/test_*.rb'
  test.verbose = true
end

require 'rcov/rcovtask'
Rcov::RcovTask.new do |test|
  test.libs << 'test'
  test.pattern = 'test/**/test_*.rb'
  test.verbose = true
  test.rcov_opts << '--exclude "gems/*"'
end

task :default => :test

require 'rdoc/task'
Rake::RDocTask.new do |rdoc|
  version = File.exist?('VERSION') ? File.read('VERSION') : ""

  rdoc.rdoc_dir = 'rdoc'
  rdoc.title = "nyc-greenmarkets #{version}"
  rdoc.rdoc_files.include('README*')
  rdoc.rdoc_files.include('lib/**/*.rb')
end

require 'lib/nyc-greenmarkets'
# https://nycopendata.socrata.com/Business-and-Economic/2012-NYC-Farmers-Market-List/b7kx-qikm
url = 'https://nycopendata.socrata.com/api/views/b7kx-qikm/rows.json?accessType=DOWNLOAD'
cache = 'fixtures/greenmarkets.json'
transformed = '_includes/transformed.json'
greenmarket =  Greenmarket.new

task :populate_fixtures do
	greenmarket.download(url,cache)
end

task :transform do
	greenmarket.transform(cache, transformed)
end
