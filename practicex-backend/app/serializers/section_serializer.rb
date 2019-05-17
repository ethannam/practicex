class SectionSerializer < ActiveModel::Serializer
  attributes :id, :name, :order, :standard_time, :total_questions, :display_time

  def display_time
    "#{object.standard_time / 60}"
  end
end
