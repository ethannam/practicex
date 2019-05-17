class TestAttemptSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :test_id, :user_id, :attempt_type, :section_attempts
  has_many :section_attempts

  def section_attempts
    object.section_attempts.sort
  end
end