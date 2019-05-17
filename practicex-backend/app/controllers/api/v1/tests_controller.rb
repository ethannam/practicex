class Api::V1::TestsController < ApplicationController
  skip_before_action :authorized, only: [:index, :show]

  def index
    render json: Test.includes(:sections), include: ['sections']
  end

  def show
    foundTest = Test.find_by(name: params[:id].upcase)
    render json: foundTest, include: ['sections']
  end
end
