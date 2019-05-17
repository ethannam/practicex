class Test < ApplicationRecord
  has_many :test_forms
  has_many :test_attempts
  has_many :test_sections
  has_many :sections, through: :test_sections

  validates :name,
    presence: true
  validates :version,
    presence: true
  validates :updates,
    presence: true
end
