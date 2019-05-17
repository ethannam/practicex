class ApplicationController < ActionController::API
  before_action :authorized

  def encode_token(payload)
    JWT.encode(payload, 'shhhSuperSecretKey')
  end

  def auth_header
    request.headers['authorization']
  end
 
  def decode_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, 'shhhSuperSecretKey', true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user
    if decode_token
      id = decode_token[0]['id']
      user = User.find_by(id: id)
    end
  end
 
  def logged_in?
    current_user ? true : false
  end

  def authorized
    render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
  end
end
