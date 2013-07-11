require 'randy'
require 'github_api'
require 'sinatra'

configure do
  GITHUB = Github.new(:login => 'dtao', :password => ENV['GITHUB_PASSWORD'])
end

def params_present?(*required)
  required.all? { |p| params.include?(p) && !(params[p].nil? || params[p].empty?) }
end

get '/' do
  haml :index
end

get '/file/:filename' do |filename|
  @filename = filename

  response = GITHUB.repos.contents.get 'dtao', 'ghdb', "db/#{filename}"
  @content = Base64.decode64(response.content)
  haml :index
end

post '/' do
  halt 'Message and content are required.' unless params_present?('message', 'content')

  filename = Randy.string(20)
  GITHUB.repos.contents.create 'dtao', 'ghdb', "db/#{filename}", {
    :path    => "db/#{filename}",
    :message => params['message'],
    :content => params['content']
  }

  redirect "/file/#{filename}"
end

post '/file/:filename' do |filename|
  halt 'Message and content are required.' unless params_present?('message', 'content')

  GITHUB.repos.contents.update 'dtao', 'ghdb', "db/#{filename}", {
    :path    => "db/#{filename}",
    :message => params['message'],
    :content => params['content']
  }

  redirect "/file/#{filename}"
end
