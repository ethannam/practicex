class Api::V1::UsersController < ApplicationController
  skip_before_action :authorized, only: [:create, :test_attempts]

  def create
    user = User.create(user_params)

    if user.valid?
      token = encode_token({
        id: user.id,
        email: user.email,
        username: user.username 
      })
      render json: { user: UserSerializer.new(user), jwt: token }, status: :created
    else
      render json: { error: 'Failed to create user' }, status: :not_acceptable
    end
  end

  def profile
    render json: { user: UserSerializer.new(current_user) }, status: :accepted
  end

  def test_attempts
    test_attempts = User.find(params[:id]).test_attempts.to_a

    if !test_attempts.empty?
      test_attempts.sort! { |x, y| y.start_date <=> x.start_date }
      test_attempts = test_attempts.map do |ta|
        sectionAttempts = ta.section_attempts.to_a
        sections = sectionAttempts.map do |sa|
          completed = sa.time_remaining == 0 ? true : false
          { name: sa.section.name, completed: completed }
        end
        { id: ta.id, startDate: ta.start_date.to_date.to_formatted_s(:long_ordinal), testName: ta.test.name, sections: sections }
      end

      render json: test_attempts
    else
      render :json => [{ sections: [] }]
    end

    
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
