class Api::V1::SectionAttemptsController < ApplicationController


  def update
    SectionAttempt.find(params[:id]).update(section_attempt_params)
  end

  private

  def section_attempt_params
    params.require(:section_attempt).permit(:id, :time_remaining)
  end
end
