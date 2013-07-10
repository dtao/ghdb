require 'github_api'
require 'sinatra'

configure do
  @github = Github.new(:login => 'dtao', :password => ENV['GITHUB_PASSWORD'])
end

get '/' do
  haml :index
end

post '/' do
end

post '/:filename' do
end
