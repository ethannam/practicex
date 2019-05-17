class SectionAttempt < ApplicationRecord
  belongs_to :section
  belongs_to :section_form, optional: true
  belongs_to :test_attempt

  # validates :time_remaining,
  #   presence: true,
  #   numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  # validates :time_over,
  #   presence: true,
  #   numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :start_date,
    presence: true

  # validate :is_start_date_valid, on: :create
  # validate :is_end_date_valid, on: :update

  # def is_start_date_valid
  #   if (start_date != nil)
  #     errors.add(:start_date, "must be today") unless (start_date.to_date == Date.today)
  #   end
  # end

  # def is_end_date_valid
  #   errors.add(:end_date, "must be after the start date") unless (end_date == nil || end_date > start_date)
  # end
end
