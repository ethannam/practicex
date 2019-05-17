class Api::V1::TestAttemptsController < ApplicationController
  include ActionView::Helpers::DateHelper
  skip_before_action :authorized, only: [:index, :show, :recent, :grade]

  def index
    test_attempts = TestAttempt.all

    render json: test_attempts
  end

  def show
    test_attempt = TestAttempt.find(params[:id])

    render json: test_attempt
  end

  def create
    if current_user.id == params[:test_attempt][:user_id]
      params[:test_attempt][:start_date] = DateTime.now()
      params[:test_attempt][:attempt_type] = 'mock'
      test_attempt = TestAttempt.create(test_attempt_params)
      test_attempt.new_section_ids = params[:test_attempt][:new_section_ids]
    end

    render json: test_attempt
  end

  def grade
    readingAnswers = 'AJCHBJAHBJAJCJBHBFDFAGDJCGCJCGAGAJDHBJAH'.split('').map do |letter|
      case letter
      when 'A'
        [0]
      when 'B'
        [1]
      when 'C'
        [2]
      when 'D'
        [3]
      when 'F'
        [0]
      when 'G'
        [1]
      when 'H'
        [2]
      when 'J'
        [3]
      else
        []
      end
    end

    readingScale = {
      '0': 1,
      '1': 2,
      '2': 4,
      '3': 6,
      '4': 7,
      '5': 8,
      '6': 10,
      '7': 10,
      '8': 11,
      '9': 12,
      '10': 12,
      '11': 13,
      '12': 14,
      '13': 14,
      '14': 15,
      '15': 16,
      '16': 16,
      '17': 17,
      '18': 18,
      '19': 19,
      '20': 19,
      '21': 20,
      '22': 21,
      '23': 21,
      '24': 22,
      '25': 23,
      '26': 23,
      '27': 24,
      '28': 25,
      '29': 26,
      '30': 27,
      '31': 28,
      '32': 29,
      '33': 30,
      '34': 31,
      '35': 32,
      '36': 32,
      '37': 33,
      '38': 34,
      '39': 35,
      '40': 36,
    }

    filepath = params[:file].to_path
    sheet = Mork::SheetOMR.new filepath, 'layout.yml'

    choices = [5] * 40
    sheet.set_choices choices

    student_answers = sheet.marked_choices

    rawScore = 0
    incorrectQuestions = []

    student_answers.each_with_index do |answer, i|
      if answer == readingAnswers[i]
        rawScore += 1
      else
        incorrectQuestions.push(i + 1)
      end
    end

    sheet.overlay :outline, readingAnswers
    sheet.overlay :check, :marked
    sheet.save 'marked_choices_and_outlines.jpg'
    # system 'open marked_choices_and_outlines.jpg'

    original = File.read(filepath)
    corrected = File.read('marked_choices_and_outlines.jpg')

    # send_file 'marked_choices_and_outlines.jpg', type: 'image/jpeg', disposition: 'inline'
    render :json => { rawScore: rawScore, incorrectQuestions: incorrectQuestions.to_s, scaledScore: readingScale[:"#{rawScore}"] }
  end

  def recent
    test_attempts = TestAttempt.joins(:user).joins(:test).pluck('users.username', 'tests.name', 'test_attempts.start_date', 'test_attempts.id').last(25).reverse

    test_attempts.map! do |ta|
      time_distance = distance_of_time_in_words_to_now(ta.third.to_datetime)
      { username: ta.first, test: ta.second, timeDistance: "#{time_distance} ago", id: ta.last }
    end

    if !test_attempts.empty?
      render json: test_attempts
    else
      render json: [{ username: '', test: '', timeDistance: '', id: '' }]
    end
  end

  def history
    test_attempt_frequency = [{ day: '', value: 0 }]
    dates = current_user.test_attempts.pluck(:start_date)

    if !dates.empty?
      dates.map! { |date| date.to_date.to_s }
      test_attempt_frequency = dates.each_with_object(Hash.new(0)) { |date, hash| hash[date] += 1 }
      test_attempt_frequency = test_attempt_frequency.to_a.map do |day|
        { day: day.first, value: day.second}
      end
    end

    render json: test_attempt_frequency
  end

  private

  def test_attempt_params
    params.require(:test_attempt).permit(:attempt_type, :start_date, :end_date, :test_id, :user_id)
  end
end
