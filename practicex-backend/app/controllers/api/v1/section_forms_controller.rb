class Api::V1::SectionFormsController < ApplicationController
  def index
    section_forms = SectionForm.all
    render json: section_forms
  end
end
