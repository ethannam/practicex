class TestForm < ApplicationRecord
  belongs_to :test
  has_many :section_forms
  has_many :test_attempts

  enum admin_region: [:us, :international]

  validates :code,
    presence: true
  validates :admin_region,
    presence: true
  validates :admin_date,
    presence: true
  validates :admin_country,
    presence: true
end