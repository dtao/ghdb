require 'randy'
require 'github_api'
require 'sinatra'

configure do
  @github = Github.new(:login => 'dtao', :password => ENV['GITHUB_PASSWORD'])
end

get '/' do
  haml :index
end

post '/' do
  halt 'Message and content are required.' unless params['message'] && params['content']

  filename = Randy.string(20)
  @github.repos.contents.create 'dtao', 'ghdb', "db/#{filename}", {
    :path    => "db/#{filename}",
    :message => params['message'],
    :content => params['content']
  }

  filename
end
