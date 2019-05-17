class TestAttempt < ApplicationRecord
  belongs_to :user
  belongs_to :test
  belongs_to :test_form, optional: true
  has_many :section_attempts

  enum attempt_type: [:practice, :mock, :official]

  validates :attempt_type,
    presence: true
  validates :start_date,
    presence: true

  # validate :is_start_date_valid, on: :create
  # validate :is_end_date_valid, on: :create
  # validate :is_end_date_valid, on: :update

  # test_attempt = TestAttempt.create(test_id: 1, user_id: 1, start_date: Date.today(), attempt_type: 'mock')

  def new_section_ids=(ids)
    previous_section_attempt = nil

    ids.each do |id|
      section = Section.find(id)
      current_section_attempt = SectionAttempt.create(start_date: DateTime.now(), time_remaining: section.standard_time, test_attempt_id: self.id, section_id: section.id)
      self.section_attempts << current_section_attempt

      # Link previous section attempt to the current section attempt
      previous_section_attempt.next_section_attempt_id = current_section_attempt.id unless previous_section_attempt == nil

      previous_section_attempt = current_section_attempt
    end
  end

  # def is_start_date_valid
  #   if (start_date != nil)
  #     errors.add(:start_date, "must be today") unless (start_date.to_date == Date.today)
  #   end
  # end

  # def is_end_date_valid
  #   errors.add(:end_date, "must be after the start date") unless (end_date == nil || end_date > start_date)
  # end
end
