class Section < ApplicationRecord
  has_many :section_forms
  has_many :section_attempts
  has_many :test_sections
  has_many :tests, through: :test_sections

  validates :name,
    presence: true
  validates :version,
    presence: true
end
