class SectionAttemptSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :test_attempt_id, :time_remaining, :next_section_attempt_id, :section
  belongs_to :section
end