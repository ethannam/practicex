class SectionForm < ApplicationRecord
  belongs_to :section
  has_many :section_attempts
end
