class TestAttemptAccommodation < ApplicationRecord
  belongs_to :test_attempt
  belongs_to :accommodation
end
