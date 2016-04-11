# Homepage (Root path)
get '/' do
  session[:user_id] = nil
  erb :login
end

get '/index' do
  if session[:user_id]
    @user = User.find(session[:user_id])
    erb :index
  else
    @failed = true
    erb :login
  end
end

get '/Signup' do
  erb :Signup
end

post '/Signup' do
  @user = User.new(
    email: params[:email],
    password: params[:password],
    repeat_password: params[:repeat_password]
  )

  if @user.save 
    redirect '/'
  else
    erb :Signup
  end
end


post '/' do
  email = params[:email]
  password = params[:password]

  @user = User.find_by(email: email)

  if @user && password == @user.password
    session[:user_id] = @user.id
    redirect '/index'
  else 
    @login_failed = true
    erb :login
  end
end


post '/index/new_contact' do
  @name = params[:name]
  @email = params[:email]
  @phone = params[:phone]
  @message = params[:message]

  @contact = Contact.new(
    user_id: session[:user_id],
    name: @name,
    email: @email,
    phone: @phone,
    message: @message
  )
  if @contact.save 
   result = {success: true, data: [@contact]}.to_json

  else
    @failed = {success: false}.to_json
  end
end

delete '/index/delete_contact' do
  id = params[:contactId]
  @contact = Contact.find_by(id: id)
  @contact.destroy
  id
end

patch '/index/edit_contact' do

  id = params[:contactId];
  @contact = Contact.find_by(id: id)
  @name = params[:updated_name]
  @email = params[:updated_email]
  @phone = params[:updated_phone]
  @message = params[:updated_message]

  @contact.update(name: @name, email: @email, phone: @phone, message: @message)

  if @contact.save 
    result = {success: true, data: [@contact]}.to_json
  else
    result = {success: false}
  end

end
















