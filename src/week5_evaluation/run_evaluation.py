from src.week5_evaluation.evaluator import EnterpriseEvaluator

if __name__ == "__main__":

    evaluator = EnterpriseEvaluator()

    results = evaluator.evaluate_all()

    evaluator.print_summary(results)

    evaluator.export_results(results)